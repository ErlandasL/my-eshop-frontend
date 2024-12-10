import { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "Lietuva",
    street: "",
    apartment: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    confirmEmail: "",
    companyName: "",
    companyCode: "",
    vatCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate data
    if (!formData.email || formData.email !== formData.confirmEmail) {
      alert("Emails must match.");
      return;
    }
    // Submit data
    console.log("Form submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Pirkėjo duomenys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Fields */}
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Vardas *"
          className="border p-2 rounded"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Pavardė *"
          className="border p-2 rounded"
          required
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Gatvė, namo numeris *"
          className="border p-2 rounded"
          required
        />
        <input
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          placeholder="Butas, blokas (nebūtinas)"
          className="border p-2 rounded"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Miestas *"
          className="border p-2 rounded"
          required
        />
        <input
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Apskritis *"
          className="border p-2 rounded"
          required
        />
        <input
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Pašto kodas *"
          className="border p-2 rounded"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefonas *"
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="El.paštas *"
          className="border p-2 rounded"
          required
        />
        <input
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          placeholder="Pakartokite el. paštą *"
          className="border p-2 rounded"
          required
        />

        {/* Optional Fields */}
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Įmonės pavadinimas (nebūtinas)"
          className="border p-2 rounded"
        />
        <input
          name="companyCode"
          value={formData.companyCode}
          onChange={handleChange}
          placeholder="Įmonės kodas (nebūtinas)"
          className="border p-2 rounded"
        />
        <input
          name="vatCode"
          value={formData.vatCode}
          onChange={handleChange}
          placeholder="Įmonės PVM Kodas (nebūtinas)"
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
