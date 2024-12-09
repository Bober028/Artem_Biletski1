export interface LabelWithInputProps {
  labelName: string;
  type: string;
  name: string;
  value: string;
  onChange: (value: string) => void
}

const LabelWithInput = ({
  labelName,
  type,
  name,
  value,
  onChange
}: LabelWithInputProps) => {
  return <>
    <label>
      {labelName}:
      <input type={type} name={name} value={value} onChange={(event) => onChange(event.target.value)}/>
    </label>
    <br />
  </>
}

export default LabelWithInput;