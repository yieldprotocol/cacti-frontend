import { TxArgType } from './TransactionReplay';

const TransactionReplayInput = ({
  name,
  value,
  type,
  onChange,
}: {
  name: string;
  value: string;
  type: TxArgType;
  onChange: any;
}) => {
  if (type === 'bool') {
    return (
      <input
        type="checkbox"
        checked={value === 'true' ? true : false}
        onChange={(e) => onChange({ name, value: e.target.checked.toString(), type })}
      />
    );
  } else if (type.startsWith('uint') || type.startsWith('int')) {
    return (
      <input
        type="number"
        name={name}
        className="input-class"
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value, type })}
      />
    );
  } else if (type === 'address') {
    return (
      <input
        type="text"
        name={name}
        className="input-class"
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value, type })}
      />
    );
  } else if (type.startsWith('bytes')) {
    return (
      <input
        type="text"
        name={name}
        className="input-class"
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value, type })}
      />
    );
  } else if (type === 'string') {
    return (
      <input
        type="text"
        name={name}
        className="input-class"
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value, type })}
      />
    );
  }

  return (
    <input
      type="text"
      name={name}
      className="input-class"
      value={value}
      onChange={(e) => onChange({ name, value: e.target.value, type })}
    />
  );
};

export default TransactionReplayInput;
