import { containerSettings } from "~/settings/container";

export function Schema() {
    return {
        category: 'Testing sections',
        label: 'My First Section',
        key: 'myFirstSection',
        fields: [
          {
            name: 'howdy',
            component: 'text',
            label: 'Greeting Label',
          },
          containerSettings()
        ]
      }
}