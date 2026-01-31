import { useEffect, useRef, useState } from 'react';

interface LanyardProps {
    className?: string;
    image?: string;
    name?: string;
    role?: string;
}

export default function Lanyard({
    className = '',
    image,
    name = 'Your Name',
    role = 'Your Role',
}: LanyardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;

        // Physics Configuration
        const physics = {
            gravity: 0.5,
            friction: 0.96,
            stiffness: 0.1, // Less stiffness for more string-like behavior
            segments: 8,
        };

        // State
        let nodes: { x: number; y: number; oldX: number; oldY: number; pinned?: boolean }[] = [];
        const mouse = { x: 0, y: 0, isDown: false };

        // Profile Card Image
        const cardImg = new Image();
        cardImg.src =
            image ||
            'https://ui-avatars.com/api/?name=Profile&background=0D8ABC&color=fff&size=256';
        let imgLoaded = false;
        cardImg.onload = () => {
            imgLoaded = true;
        };

        // Initialize Rope
        function init() {
            nodes = [];
            const startX = width / 2;
            const startY = 0;
            const segmentLength = 20;

            for (let i = 0; i < physics.segments; i++) {
                nodes.push({
                    x: startX,
                    y: startY + i * segmentLength,
                    oldX: startX,
                    oldY: startY + i * segmentLength,
                    pinned: i === 0, // Pin the top node
                });
            }
        }

        // Resize Handler
        function handleResize() {
            if (!containerRef.current || !canvas) return;
            const { clientWidth, clientHeight } = containerRef.current;
            canvas.width = clientWidth;
            canvas.height = clientHeight;
            width = clientWidth;
            height = clientHeight;
            init();
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        // Mouse Handlers
        function handleMouseMove(e: MouseEvent) {
            const rect = canvas!.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function handleMouseDown() {
            mouse.isDown = true;
        }

        function handleMouseUp() {
            mouse.isDown = false;
        }

        // Physics Update (Verlet Integration)
        function update() {
            // 1. Update positions
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                if (n.pinned) continue;

                const vx = (n.x - n.oldX) * physics.friction;
                const vy = (n.y - n.oldY) * physics.friction;

                n.oldX = n.x;
                n.oldY = n.y;

                n.x += vx;
                n.y += vy;
                n.y += physics.gravity;

                // Mouse Interaction (Push/Pull effect)
                if (mouse.isDown || isHovered) {
                    // React to hover too for fun
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const force = (100 - dist) / 100;
                        const angle = Math.atan2(dy, dx);
                        n.x += Math.cos(angle) * force * 5;
                        n.y += Math.sin(angle) * force * 5;
                    }
                }
            }

            // 2. Resolve Constraints (Stick constraints)
            const segmentLen = 25; // Distance between nodes
            for (let iter = 0; iter < 5; iter++) {
                // Iterations for stability
                for (let i = 0; i < nodes.length - 1; i++) {
                    const n1 = nodes[i];
                    const n2 = nodes[i + 1];

                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const diff = segmentLen - dist;
                    const percent = diff / dist / 2;
                    const offsetX = dx * percent;
                    const offsetY = dy * percent;

                    if (!n1.pinned) {
                        n1.x -= offsetX;
                        n1.y -= offsetY;
                    }
                    if (!n2.pinned) {
                        n2.x += offsetX;
                        n2.y += offsetY;
                    } else {
                        // If n2 were pinned (not in this case, but good for general), don't move it
                    }
                    // If n1 is pinned (top node), apply all correction to n2 with multiplier
                    if (n1.pinned) {
                        n2.x += offsetX * 2; // Move n2 twice as much
                        n2.y += offsetY * 2;
                    }
                }
            }

            // Constrain last node to bounds slightly? No, let it swing freely.
        }

        // Draw Loop
        function draw() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            // Draw Strap (Corporate Style)
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);
            // Draw curved line through nodes
            for (let i = 1; i < nodes.length - 1; i++) {
                const xc = (nodes[i].x + nodes[i + 1].x) / 2;
                const yc = (nodes[i].y + nodes[i + 1].y) / 2;
                ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
            }
            ctx.quadraticCurveTo(
                nodes[nodes.length - 1].x,
                nodes[nodes.length - 1].y,
                nodes[nodes.length - 1].x,
                nodes[nodes.length - 1].y
            ); // End line

            // Outer Border (White/Light)
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 14;
            ctx.stroke();

            // Inner Strap (Indigo/Corporate)
            ctx.strokeStyle = '#4338ca'; // Indigo-700
            ctx.lineWidth = 10;
            ctx.stroke();

            // Draw Card/Holder at the last node
            const lastNode = nodes[nodes.length - 1];
            const prevNode = nodes[nodes.length - 2];

            // Calculate angle for rotation
            const dx = lastNode.x - prevNode.x;
            const dy = lastNode.y - prevNode.y;
            const angle = Math.atan2(dy, dx) - Math.PI / 2;

            ctx.save();
            ctx.translate(lastNode.x, lastNode.y);
            ctx.rotate(angle);

            // Clip/Holder mechanism
            ctx.fillStyle = '#cbd5e1'; // Metal clip color
            ctx.fillRect(-10, -5, 20, 10);

            // Card Dimensions
            const cardW = 180; // Slightly wider
            const cardH = 240;

            // Draw Card Body (Glassmorphism + White tint for professionalism)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 10;

            // Rounded Rectangle path
            const radius = 12;
            const x = -cardW / 2;
            const y = 5; // offset slightly below clip

            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + cardW - radius, y);
            ctx.quadraticCurveTo(x + cardW, y, x + cardW, y + radius);
            ctx.lineTo(x + cardW, y + cardH - radius);
            ctx.quadraticCurveTo(x + cardW, y + cardH, x + cardW - radius, y + cardH);
            ctx.lineTo(x + radius, y + cardH);
            ctx.quadraticCurveTo(x, y + cardH, x, y + cardH - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();

            ctx.fill();

            // Border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Clip for image
            if (imgLoaded && cardImg) {
                // Header Background (Corporate Gradient)
                const grad = ctx.createLinearGradient(x, y, x + cardW, y + 80);
                grad.addColorStop(0, '#1e1b4b'); // Dark Slate
                grad.addColorStop(1, '#312e81'); // Indigo
                ctx.fillStyle = grad;
                ctx.fillRect(x, y, cardW, 90);

                // Profile Ring
                ctx.beginPath();
                ctx.arc(0, 90, 52, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();

                // Image
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 90, 48, 0, Math.PI * 2); // Image circle
                ctx.clip();
                try {
                    // Draw image centered
                    // Calculate aspect ratio to fit cover
                    const scale = Math.max(96 / cardImg.width, 96 / cardImg.height);
                    const iw = cardImg.width * scale;
                    const ih = cardImg.height * scale;
                    ctx.drawImage(cardImg, -iw / 2, -ih / 2 + 90, iw, ih);
                } catch {
                    // Ignore image cross-origin errors
                }
                ctx.restore();

                // Name Text - with truncation for long names
                ctx.fillStyle = '#1e293b'; // Slate-800
                ctx.textAlign = 'center';

                // Measure and adjust font size if name is too long
                let fontSize = 18;
                ctx.font = `bold ${fontSize}px "Outfit", sans-serif`;
                const maxWidth = cardW - 20; // Leave 10px padding on each side
                while (ctx.measureText(name).width > maxWidth && fontSize > 10) {
                    fontSize -= 1;
                    ctx.font = `bold ${fontSize}px "Outfit", sans-serif`;
                }
                ctx.fillText(name, 0, 170);

                ctx.fillStyle = '#64748b'; // Slate-500
                ctx.font = '500 12px "Outfit", sans-serif';
                ctx.fillText(role, 0, 188);

                // Footer / Barcode decoration
                ctx.fillStyle = '#000';
                ctx.fillRect(x + 40, y + cardH - 30, cardW - 80, 10); // Pseudo barcode
            }

            ctx.restore();
        }

        let animationFrameId: number;
        function loop() {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        }

        loop();

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [image, isHovered, name, role]);

    return (
        <div
            ref={containerRef}
            className={`relative flex h-[600px] w-full justify-center ${className}`}
        >
            <canvas
                ref={canvasRef}
                className="cursor-grab touch-none active:cursor-grabbing"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    );
}
