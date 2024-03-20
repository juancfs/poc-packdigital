import { Container } from "~/components";
import { MyFirstSectionCms } from "./MyFirstSection.types";
import { Schema } from "./MyFirstSection.schema";


export function MyFirstSection({cms}: {cms: MyFirstSectionCms}) {
    return (
      <Container container={cms.container}>
        <p>Hello!!!</p>
      </Container>
    );
  }
  
  MyFirstSection.displayName = 'My First Section'
  MyFirstSection.Schema = Schema;