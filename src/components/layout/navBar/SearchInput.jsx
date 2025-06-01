import { Form, InputGroup } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Not needed if LogoutButton handles its own dispatch

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
    console.log("Searching for:", searchQuery);
  };
  return (
    <Form className="d-flex mx-auto" onSubmit={handleSearch}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search movies & TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 shadow-sm"
          style={{ maxWidth: "300px" }}
        />
        <InputGroup.Text
          className="bg-white border-0 cursor-pointer"
          onClick={handleSearch}
        >
          <MdSearch size={20} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
