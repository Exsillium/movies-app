import { Form, InputGroup } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router";
import translations from "../../../translations";

export default function SearchInput({ language }) {
  const t = translations[language] || translations.en;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const isRtl = language === "ar";

  return (
    <Form
      className="d-flex mx-auto"
      onSubmit={handleSearch}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <InputGroup
        style={{
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <Form.Control
          type="search"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 shadow-sm"
          dir={isRtl ? "rtl" : "ltr"}
          style={{
            textAlign: isRtl ? "right" : "left",
            order: isRtl ? 2 : 1,
          }}
        />
        <InputGroup.Text
          className="border-0 cursor-pointer"
          onClick={handleSearch}
          style={{
            order: isRtl ? 1 : 2,
            color: "inherit",
          }}
        >
          <MdSearch size={20} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
