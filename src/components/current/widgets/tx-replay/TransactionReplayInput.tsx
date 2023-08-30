interface TransactionReplayInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionReplayInput = ({ name, value, onChange }: TransactionReplayInputProps) => (
  <input
    className="mt-2 w-full rounded-md border border-gray-700 bg-gray-primary p-2 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
    type="text"
    name={name}
    value={value}
    placeholder={value}
    onChange={onChange}
  />
);

export default TransactionReplayInput;
