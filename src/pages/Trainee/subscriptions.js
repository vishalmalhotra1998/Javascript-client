import { gql } from 'apollo-boost';

const TRAINEE_UPDATED = gql`
subscription {
        traineeUpdated{
            originalId,
            name,
            email
        }
}

`;

const TRAINEE_DELETED = gql`
subscription {
        traineeDeleted
    }

`;

export { TRAINEE_UPDATED, TRAINEE_DELETED };
