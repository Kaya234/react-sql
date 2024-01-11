import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Dropdown() {
  const url = process.env.REACT_APP_API;
  const { data: courses, error } = useFetch(url);

  const findCategory = (courses) => {
    let categories = [
      ...new Set(courses && courses.map((course) => course["category"])),
    ];
    return categories;
  };

  const getCategory = useMemo(() => findCategory(courses), [courses]);

  return (
    <div className="d-flex">
      <NavDropdown
        title="Category"
        id="basic-nav-dropdown"
        data-bs-theme="light"
      >
        {error && <li className="dropdown-item">{error}</li>}
        {getCategory &&
          getCategory.map((category, i) => (
            <Link
              className="dropdown-item"
              key={i}
              to={`/categories?category=${category}`}
            >
              {category}
            </Link>
          ))}
      </NavDropdown>
    </div>
  );
}

export default Dropdown;
