{{#each services}}
  import {{this.name}} from './{{this.name}}'
{{/each}}

export default {
  {{#each services}}
    {{this.name}},
  {{/each}}
}


export const apis = {{value apis}}
export const services = {{value services}}



