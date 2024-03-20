export const MyFirstSection =  ({ cms }: any) => {
    return (
      <p> Hello, my name is {cms.howdy} </p>
    );
  }
  
  MyFirstSection.displayName = 'My First Section'
  // Section Customizer Schema
  MyFirstSection.Schema = {
    label: 'My First Section',
    key: 'myFirstSection',
    fields: [
      {
        name: 'howdy',
        component: 'text',
        label: 'Howdy Label',
      }
    ]
  }  