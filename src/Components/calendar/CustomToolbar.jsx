
export function ViewNamesGroup({
  views: viewNames,
  view,
  messages,
  onView,
  setMonthButton,
  currentColor,
}) {
  return viewNames.map((name) => (
    <button
      type="button"
      key={name}
      className={`py-[10px] px-[19px] rounded text-[16px] leading-4 duration-150 ${
        view === name ? "bg-blueTifany text-white" : `${currentColor.bg} ${currentColor.text} `
      }`}
      onClick={() => {
        onView(name);
        setMonthButton(name);
      }}
    >
      {messages[name]}
    </button>
  ));
}

export default function CustomToolbar() {}
