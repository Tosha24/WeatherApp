interface Props {
  toggleButton: boolean;
  onToggle: () => void;
}

const ToggleButton = ({ toggleButton, onToggle }: Props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="my-8 p-4 w-fit border rounded-lg border-black text-lg font-semibold text-black cursor-pointer hover:bg-red-700 hover:text-white hover:border-none transition duration-300 ease-in-out"
        onClick={onToggle}
      >
        <button>Display in {toggleButton ? "°F" : "°C"}</button>
      </div>
    </div>
  );
};

export default ToggleButton;