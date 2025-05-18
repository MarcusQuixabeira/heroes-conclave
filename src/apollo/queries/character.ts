import { gql } from '@apollo/client/core'

function get_character(id?: string) {
  return gql`
    query getCharacter {
      character(id: ${id}) {
        id,
        name,
        status,
        species,
        type,
        gender,
        origin {
          name,
          type
        },
        location {
          name,
          type
        },
        image,
        episode {
          name,
          episode
        }
      }
    }
  `
}

export default get_character