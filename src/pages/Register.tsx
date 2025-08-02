// SignUp.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useLocation } from "wouter";
import google_logo from "../assets/icons8-google.svg";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		acceptedTerms: false,
	});
	const [error, setError] = useState("");
	const [, navigate] = useLocation();
	// const [haveAccount, sethaveAccount] = useState(false);
	const { loading } = useAuth();
	if (loading) return <div>Loading...</div>; // Affiche un loader pendant le chargement

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(""); // Réinitialise l'erreur à chaque changement
		const { id, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: type === "checkbox" ? checked : value,
		}));
	};

	const signUpWithGoogle = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithPopup(auth, googleProvider);
			navigate("/dashboard");
		} catch (error) {
			console.log("there is error", error);
			alert("something got wrong");
		}
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.repeatPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}
		try {
			await createUserWithEmailAndPassword(
				auth,
				formData.email,
				formData.password,
			);
			navigate("/dashboard");
		} catch (err) {
			setError("Erreur lors de la création du compte.");
		}
	};

	return (
		<form className="bg-blue-100 mx-auto mt-12 px-12 py-12 rounded-2xl max-w-sm amdow">
			<h2 className="mb-6 font-bold text-2xl text-center">Se connecter</h2>
			{error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

			<div className="mb-5">
				<label
					htmlFor="email"
					className="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
				>
					Your email
				</label>
				<input
					type="email"
					id="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="name@flowbite.com"
					required
					className="block bg-gray-50 dark:bg-gray-700 shadow-xs p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
				/>
			</div>

			<div className="mb-5">
				<label
					htmlFor="password"
					className="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
				>
					Your password
				</label>
				<input
					type="password"
					id="password"
					value={formData.password}
					onChange={handleChange}
					required
					className="block bg-gray-50 dark:bg-gray-700 shadow-xs p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
				/>
			</div>

			<div className="mb-5">
				<label
					htmlFor="repeatPassword"
					className="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
				>
					Repeat password
				</label>
				<input
					type="password"
					id="repeatPassword"
					value={formData.repeatPassword}
					onChange={handleChange}
					required
					className="block bg-gray-50 dark:bg-gray-700 shadow-xs p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
				/>
			</div>

			<div className="flex items-start mb-5">
				<div className="flex items-center h-5">
					<input
						id="acceptedTerms"
						type="checkbox"
						checked={formData.acceptedTerms}
						onChange={handleChange}
						className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800 dark:ring-offset-gray-800 w-4 h-4"
						required
					/>
				</div>
				<label
					htmlFor="acceptedTerms"
					className="ms-2 font-medium text-gray-900 dark:text-gray-300 text-sm"
				>
					I agree with the{" "}
					<a
						href="google.com"
						className="text-blue-600 dark:text-blue-500 hover:underline"
					>
						terms and conditions
					</a>
				</label>
			</div>

			<div className="flex items-start mb-5">
				<button
					type="submit"
					onClick={handleSubmit}
					className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full font-medium text-white text-sm text-center"
				>
					Register new account
				</button>
			</div>
			<button
				type="button"
				onClick={signUpWithGoogle}
				className="relative flex items-center bg-zinc-50 hover:bg-zinc-100 dark:bg-gray-600 dark:hover:bg-gray-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full font-medium text-black text-sm text-center cursor-pointer"
			>
				<img src={google_logo} alt="" className="absolute scale-60" />

				<div className="w-full text-center">SignIn with google</div>
			</button>
			<div className="flex justify-center items-baseline space-x-6 mt-6 text-sm text-center">
				<p className="">You have an account?</p>{" "}
				<button
					type="button"
					onClick={() => navigate("/login")}
					className="font-medium text-blue-700 text-base capitalize"
				>
					signIn
				</button>
			</div>
		</form>
	);
};

export default SignUp;
