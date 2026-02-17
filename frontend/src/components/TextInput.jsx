export default function TextInput({ value, setValue, onFocus }) {
  return (
    <textarea
      className="isl-textarea compact"
      placeholder="Type here…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={onFocus}
    />
  );
}
