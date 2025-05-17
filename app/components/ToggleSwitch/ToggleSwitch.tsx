type ToggleSwitchProps = {
  isChecked: boolean;
  onChange: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
          isChecked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isChecked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;
