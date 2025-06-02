import { NavDropdown } from "react-bootstrap";
import { useLanguage } from "../../../LanguageContext";
import { MdLanguage } from "react-icons/md"; // Import an icon

const LangToggler = () => {
	const { language, setLanguage, setApiLanguage } = useLanguage();

	function handleLanguageChange(newLang) {
		setLanguage(newLang);
		setApiLanguage && setApiLanguage(newLang);

		localStorage.setItem("language", newLang);
		document.body.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
	}

	const languages = [
		{ code: "en", name: "EN" },
		{ code: "fr", name: "FR" },
		{ code: "ar", name: "AR" },
		{ code: "zh", name: "ZH" },
	];

	return (
		<NavDropdown
			title={
				<>
					<MdLanguage size={20} className="me-1" />
					{language.toUpperCase()}
				</>
			}
			id="language-dropdown"
			align="end"
			className="fw-semibold mx-lg-2"
		>
			{languages.map((lang) => (
				<NavDropdown.Item
					key={lang.code}
					onClick={() => handleLanguageChange(lang.code)}
					active={language === lang.code}
				>
					{lang.name}
				</NavDropdown.Item>
			))}
		</NavDropdown>
	);
};
export default LangToggler;
