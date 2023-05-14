const TransactionBreakdown = ({
  tokenInSymbol,
  tokenOutSymbol,
  exchangeRate,
  amountOutMinimum,
}: {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  exchangeRate?: string;
  amountOutMinimum?: string;
}) => {
  return (
    <div className="grid gap-1.5 rounded-sm border border-gray-200/25 bg-gray-700 p-3.5 shadow-lg">
      <div className="mb-1 text-sm font-medium text-gray-100">Transaction Breakdown</div>
      <div className="rounded-sm bg-gray-900/50 p-3.5">
        <div className="flex justify-between text-sm text-gray-400">
          <div className="font-medium">Exchange Rate</div>
          <div className="text-gray-100">
            1 {tokenInSymbol} = {exchangeRate} {tokenOutSymbol}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <div className="text-sm text-gray-400">Minimum {tokenOutSymbol} Received</div>
          <div className="">{amountOutMinimum}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBreakdown;
