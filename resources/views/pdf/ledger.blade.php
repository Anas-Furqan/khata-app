
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border: 1px solid #000; padding: 6px; text-align: right; }
    th:first-child, td:first-child { text-align: left; }
    .heading { text-align: center; margin-bottom: 20px; font-size: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="heading">ANAS FABRICS - Ledger</div>
  <p><strong>Customer:</strong> {{ $customer->name }} ({{ $customer->shop_name }})</p>
  <p><strong>Date:</strong> {{ now()->format('d M, Y') }}</p>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Particulars</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($entries as $entry)
        <tr>
          <td>{{ \Carbon\Carbon::parse($entry['date'])->format('d-m-Y') }}</td>
          <td>{{ $entry['name'] }}</td>
          <td>{{ number_format($entry['debit'] ?? 0, 0) }}</td>
          <td>{{ number_format($entry['credit'] ?? 0, 0) }}</td>
          <td>{{ number_format($entry['balance'], 0) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
</body>
</html>
