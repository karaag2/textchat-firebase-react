// SignIn.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.ts";
import { useLocation } from "wouter";
import google_logo from "../assets/icons8-google.svg";
import { useAuth } from "../context/AuthContext";

const LogIn = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [, navigate] = useLocation();
	// const [haveAccount, sethaveAccount] = useState(false);

	const { loading } = useAuth();
	if (loading) return <div>Loading...</div>; // Affiche un loader pendant le chargement

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setError(""); // Réinitialise l'erreur à chaque changement
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, formData.email, formData.password);
			navigate("/dashboard"); // redirige vers ta page principale
		} catch (err) {
			setError("Échec de la connexion. Vérifie tes identifiants.");
			console.log(formData.email, formData.password); // Pour déboguer
		}
	};

	const signUpWithGoogle = async () => {
		try {
			await signInWithRedirect(auth, googleProvider);
		} catch (error) {
			console.log("there is error", error);
			alert("something got wrong");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-blue-100 mx-auto mt-12 px-12 py-12 rounded-2xl max-w-sm amdow"
		>
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

			<div className="flex items-start mb-5">
				<button
					type="submit"
					className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full font-medium text-white text-sm text-center"
				>
					Sign In
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
				<p className="">You Don't have an account?</p>{" "}
				<button
					type="button"
					onClick={() => navigate("/register")}
					className="font-medium text-blue-700 text-base capitalize"
				>
					signUp
				</button>
			</div>
		</form>
	);
};

export default LogIn;
