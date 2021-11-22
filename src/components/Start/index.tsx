// step
// rep
// work
// rest
// break
// GO!
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1A1A1A;
`;

const Start: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <h1 onClick={() => history.push("/running")}>START</h1>
    </Container>
  );
};

export default Start;