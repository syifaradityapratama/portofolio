import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import profile from './profile'

import skills from './skills'
import experience from './experience'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, profile, skills, experience, contact],
}
