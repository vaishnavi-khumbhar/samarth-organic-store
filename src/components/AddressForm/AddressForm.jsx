import { useState, useEffect } from "react";
import { Home, Briefcase, MapPin } from "lucide-react";
import { useAddress } from "../../context/AddressContext";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3C8C2E] outline-none transition-colors";

const AddressForm = ({ onSaved, onCancel }) => {
  const { addAddress } = useAddress();

  const [form, setForm] = useState({
    name: "",
    flat: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    country: "India",
    landmark: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    tag: "Home",
  });

  const [pincodeOptions, setPincodeOptions] = useState([]);
  const [pincodeStatus, setPincodeStatus] = useState(""); // "loading" | "notfound" | ""

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Pincode -> city/state lookup (India Post public API)
  useEffect(() => {
    const pin = form.pincode.trim();
    if (pin.length !== 6) {
      setPincodeOptions([]);
      setPincodeStatus("");
      return;
    }

    let cancelled = false;
    setPincodeStatus("loading");

    fetch(`https://api.postalpincode.in/pincode/${pin}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const postOffices = data?.[0]?.PostOffice;

        if (data?.[0]?.Status === "Success" && postOffices?.length) {
          const opts = postOffices.map((po) => ({
            label: `${po.Name} — ${po.District}`,
            city: po.District,
            state: po.State,
          }));
          setPincodeOptions(opts);
          setPincodeStatus("");
          setForm((f) => ({ ...f, city: opts[0].city, state: opts[0].state }));
        } else {
          setPincodeOptions([]);
          setPincodeStatus("notfound");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPincodeOptions([]);
          setPincodeStatus("notfound");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.pincode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(form);
    onSaved?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5 space-y-3"
    >
      <h3 className="font-bold text-[#2B2B28] mb-1">Delivery Address</h3>

      <input required placeholder="Enter Recipient Name *" value={form.name} onChange={set("name")} className={inputClass} />

      <input required placeholder="Enter Flat/ House No. / Floor *" value={form.flat} onChange={set("flat")} className={inputClass} />

      <input required placeholder="Enter Colony/ Street / Locality *" value={form.locality} onChange={set("locality")} className={inputClass} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            required
            inputMode="numeric"
            maxLength={6}
            placeholder="Pincode *"
            value={form.pincode}
            onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
            className={inputClass}
          />
          {pincodeStatus === "loading" && <p className="text-[10px] text-[#a89f92] mt-1">Checking pincode...</p>}
          {pincodeStatus === "notfound" && form.pincode.length === 6 && (
            <p className="text-[10px] text-[#B23A3A] mt-1">Pincode not found — enter city/state manually</p>
          )}
        </div>

        {pincodeOptions.length > 1 ? (
          <select
            value={`${form.city}|${form.state}`}
            onChange={(e) => {
              const [city, state] = e.target.value.split("|");
              setForm((f) => ({ ...f, city, state }));
            }}
            className={inputClass}
          >
            {pincodeOptions.map((opt) => (
              <option key={opt.label} value={`${opt.city}|${opt.state}`}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input required placeholder="City *" value={form.city} onChange={set("city")} className={inputClass} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="State *" value={form.state} onChange={set("state")} className={inputClass} />
        <select value={form.country} onChange={set("country")} className={inputClass}>
          <option value="India">India</option>
        </select>
      </div>

      <input placeholder="Landmark (optional)" value={form.landmark} onChange={set("landmark")} className={inputClass} />

      <input type="email" placeholder="Email ID (optional)" value={form.email} onChange={set("email")} className={inputClass} />

      <input
        required
        type="tel"
        inputMode="numeric"
        maxLength={10}
        placeholder="Mobile Number *"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
        className={inputClass}
      />

      <div className="grid grid-cols-2 gap-3">
        <input placeholder="Age (optional)" value={form.age} onChange={set("age")} className={inputClass} />
        <select value={form.gender} onChange={set("gender")} className={inputClass}>
          <option value="">Gender (optional)</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex gap-2">
        {[
          { id: "Home", icon: Home },
          { id: "Work", icon: Briefcase },
          { id: "Others", icon: MapPin },
        ].map(({ id, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setForm((f) => ({ ...f, tag: id }))}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              form.tag === id ? "bg-[#7A2418] text-white border-[#7A2418]" : "border-[#ecdfc9] text-[#7A2418]"
            }`}
          >
            <Icon size={13} /> {id}
          </button>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 border border-[#ecdfc9] text-[#7A2418] font-bold py-3 rounded-xl transition-colors">
            Cancel
          </button>
        )}
        <button type="submit" className="flex-1 bg-[#B23A3A] hover:bg-[#93302f] text-white font-bold py-3 rounded-xl transition-colors">
          Save &amp; Deliver here
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
