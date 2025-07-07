<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .heading { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 6px; text-align: center; }
    </style>
</head>
<body>
    <div class="heading">ANAS FABRICS - Supplier Bill</div>

    <p><strong>Bill No:</strong> {{ $bill->bill_no }}</p>
    <p><strong>Supplier:</strong> {{ $bill->supplier->name }} ({{ $bill->supplier->company }})</p>
    <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($bill->created_at)->format('d-m-Y') }}</p>

    <table>
        <thead>
            <tr>
                <th>Qty</th>
                <th>Item</th>
                <th>Meter</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($bill->items as $item)
                <tr>
                    <td>{{ $item->qty }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->meter }}</td>
                    <td>{{ number_format($item->price) }}</td>
                    <td>{{ number_format($item->meter * $item->price) }}</td>
                </tr>
            @endforeach
            <tr>
                <td colspan="4"><strong>Total</strong></td>
                <td><strong>{{ number_format($bill->total) }}</strong></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
