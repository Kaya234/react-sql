import React from "react";
import CourseCard from "./CourseCard";
import { useFetch } from "../../hooks/useFetch";
import Container from "react-bootstrap/Container";

function CoursePage() {
  const url = process.env.REACT_APP_API;
  const { data: courses, isPending, error } = useFetch(url);

  return (
    <Container>
      <h1 className="title">Courses</h1>
      <CourseCard courses={courses} isPending={isPending} error={error} />
    </Container>
  );
}

export default CoursePage;
