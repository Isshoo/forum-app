import styled from 'styled-components';

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: ${(props) => props.gap};
  background-color: transparent;
  padding-inline: ${(props) => props.paddinginline};
  padding-block: ${(props) => props.paddingblock};

  &.leaderboards-list {
    @media (max-width: 500px) {
      padding-inline: 0.25rem;
      padding-block: 1rem 0rem;
    }

    @media (max-width: 368px) {
      padding-inline: 0rem;
    }
  }
`;

List.defaultProps = {
  paddinginline: '0',
  paddingblock: '0',
  gap: '1.25rem',
};

export default List;