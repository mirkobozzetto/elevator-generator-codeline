import { InputRangeProps } from "@/types/types";

const InputRange = ({ label, min, max, value, onChange }: InputRangeProps) => (
  <label className="form-control w-full max-w-xs">
    <span className="mb-1 label-text">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="range range-primary range-sm"
    />
  </label>
);

export default InputRange;
