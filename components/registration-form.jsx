export default function RegistrationForm() {
  async function handleSubmit(event) {
    // Prevent page reload
    event.preventDefault();
    console.log('hejhej');
    const { data, error } = await supabase
      .from('Users')
      .insert({ email: 'jaken@gmail.com', password: 'Denmark' })
      .select();
  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input type="text" name="email" />
          {/* {renderErrorMessage('uname')} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" />
          {/* {renderErrorMessage('pass')} */}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
