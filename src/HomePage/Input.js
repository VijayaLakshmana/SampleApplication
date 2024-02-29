export default function InputField(props) {
  return (
    <>
      <input
        type={props.type}
        onChange={props.onChange}
        className={props.className}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        required
      />
    </>
  );
}
