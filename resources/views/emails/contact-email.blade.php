<!DOCTYPE html>
<html>
<head>
    <title>Pesan Baru</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Halo Admin,</h2>
    <p>Ada pesan baru dari pengunjung portfolio Anda:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Nama</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{ $data['name'] }}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{ $data['email'] }}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Pesan</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{ $data['message'] }}</td>
        </tr>
    </table>

    <p style="margin-top: 20px;">Segera balas pesan ini ke <strong>{{ $data['email'] }}</strong>.</p>
</body>
</html>
