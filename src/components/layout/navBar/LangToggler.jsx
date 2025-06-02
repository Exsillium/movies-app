import { useLanguage } from "../../../LanguageContext";

const LangToggler = () => {
	const { language, setLanguage, t, setApiLanguage } = useLanguage();

	function handleLanguageChange(e) {
		const newLang = e.target.value;

		setLanguage(newLang);
		setApiLanguage && setApiLanguage(newLang);

		localStorage.setItem("language", newLang);
		document.body.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
	}
	return (
		<Nav className="px-4 px-lg-0">
			<select
				style={{ maxWidth: "100px" }}
				className="language-select  my-2"
				value={language}
				onChange={handleLanguageChange}
			>
				<option value="en">EN</option>
				<option value="fr">FR</option>
				<option value="ar">AR</option>
				<option value="zh">ZH</option>
			</select>
		</Nav>
	);
};
