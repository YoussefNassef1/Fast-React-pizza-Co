import { useSelector } from "react-redux";

function User() {
  const { username } = useSelector((state) => state.user);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default User;
