<?php

/**
 * Storage File Proxy untuk hosting tanpa symlink (InfinityFree, dll)
 *
 * Akses file dengan: /storage.php?file=profile/image.jpg
 * Atau via URL rewrite: /storage/profile/image.jpg
 */

$file = $_GET['file'] ?? '';

// Sanitasi path untuk keamanan
$file = str_replace(['..', "\0"], '', $file);
$file = ltrim($file, '/');

if (empty($file)) {
    http_response_code(400);
    exit('File parameter required');
}

// Path ke storage (InfinityFree: storage ada di dalam htdocs)
// Coba path internal dulu, kalau gak ada coba path htdocs
$storagePath = __DIR__ . '/../storage/app/public/' . $file;

// Fallback: kalau storage ada di dalam htdocs (InfinityFree)
if (!file_exists($storagePath)) {
    $storagePath = __DIR__ . '/storage/' . $file;
}

if (!file_exists($storagePath)) {
    http_response_code(404);
    exit('File not found');
}

// Deteksi MIME type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $storagePath);
finfo_close($finfo);

// Set headers
header('Content-Type: ' . $mimeType);
header('Content-Length: ' . filesize($storagePath));
header('Cache-Control: public, max-age=31536000'); // Cache 1 tahun

// Output file
readfile($storagePath);
