<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ $bill->bill_no }}</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            padding: 20px;
            color: #000;
        }

        .top-strip {
            height: 8px;
            background: linear-gradient(to right, #007bff, #e3342f, #38c172);
            margin-bottom: 10px;
        }

        .company-name {
            font-size: 20px;
            font-weight: bold;
            color: #e3342f;
        }

        .header,
        .customer-info {
            margin-bottom: 15px;
        }

        .header-table td {
            padding: 2px 5px;
        }

        .info-line {
            border-bottom: 1px dotted #000;
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
        }

        tfoot td {
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            font-size: 11px;
        }

        .footer .line {
            margin-top: 10px;
            border-top: 1px solid #000;
            width: 200px;
            text-align: center;
        }

        .color-strip-bottom {
            height: 8px;
            background: linear-gradient(to right, #007bff, #38c172, #e3342f);
            margin-top: 30px;
        }
    .footer {
        margin-top: 30px;
        font-size: 14px;
    }

    .signature-block {
        margin-top: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .signature-block img {
        width: 200px;
        border: none;
        outline: none;
        box-shadow: none;
    }

    .signature-text {
        text-align: left;
        font-weight: bold;
        margin-top: 5px;
    }

    </style>
</head>

<body>

    <div class="top-strip"></div>

    <div class="header">
        <table width="100%" class="header-table">
            <tr>
                <td>
                    <div class="company-name">ANAS FABRICS</div>
                    <div>Your Wholesale Partner</div>
                    <div>Gulzar Market, Lahore</div>
                    <div>Phone: 0300-0000000</div>
                    <div>Email: anas@fabrics.pk</div>
                </td>
                <td style="text-align:right;">
                    <strong>INVOICE</strong><br>
                    Invoice No: {{ $bill->bill_no }}<br>
                    Date: {{ \Carbon\Carbon::parse($bill->created_at)->format('d-m-Y') }}
                </td>
            </tr>
        </table>
    </div>

    <div class="customer-info">
        <strong>Customer Name:</strong> {{ $bill->customer->name }}<br>
        <strong>Address:</strong> {{ $bill->customer->address }}<br>
        <strong>Phone:</strong> {{ $bill->customer->phone }}
    </div>

    <table>
        <thead>
            <tr>
                <th>Sr#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Meter</th>
                <th>Rate</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($bill->items as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->qty }}</td>
                    <td>{{ number_format($item->meter, 0) }}</td>
                    <td>{{ number_format($item->price, 0) }}</td>
                    <td>{{ number_format($item->meter * $item->price, 0) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5">Total</td>
                <td>{{ number_format($bill->total, 0) }}</td>
            </tr>
        </tfoot>
    </table>
    @php
        $formatter = new \NumberFormatter('en', \NumberFormatter::SPELLOUT);
        $inWords = ucfirst($formatter->format($bill->total));

    @endphp
    <div class="footer">
    <p><strong>Rupees in words:</strong> {{ $inWords }} Only</p>

    <div class="signature-block">
        <div>
            <img src="{{ public_path('/images/signature.png') }}" alt="Signature">
            <div class="signature-text">Authorized Signature</div>
        </div>
    </div>
</div>


    <div class="color-strip-bottom"></div>

</body>

</html>
