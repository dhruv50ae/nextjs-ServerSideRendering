const UserIdPage = ({ id }) => {
  return <div>{id}</div>;
};

export default UserIdPage;

export async function getServerSideProps({ params }) {
  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
