const UserProfilePage = ({ username }) => {
  return <h1>{username}</h1>;
};

export default UserProfilePage;

export async function getServerSideProps() {
  return {
    props: {
      username: "Dhruv.50AE",
    },
  };
}
