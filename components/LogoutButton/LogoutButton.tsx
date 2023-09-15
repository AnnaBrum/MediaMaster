export function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="border border-gray-700 rounded px-4 py-2 text-black mb-2">
        Logout
      </button>
    </form>
  );
}
