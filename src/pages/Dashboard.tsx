import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useLocation } from "wouter";
const Dashboard = () => {
	const [, navigate] = useLocation();
	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("Déconnecté !");
			navigate("/login"); // Redirige vers la page de connexion après la déconnexion
		} catch (err) {
			console.error("Erreur de déconnexion", err);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen text-gray-800">
			<header className="flex justify-between items-center bg-white shadow p-4">
				<h1 className="font-bold text-xl">Mon Dashboard</h1>
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
					type="button"
				>
					Se déconnecter
				</button>
			</header>

			<main className="p-6">
				<h2 className="mb-4 font-semibold text-2xl">Bienvenue 👋</h2>
				<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					<div className="bg-white shadow p-4 rounded-lg">
						<h3 className="font-semibold text-lg">Statistique 1</h3>
						<p className="text-gray-600 text-sm">Quelques infos...</p>
					</div>
					<div className="bg-white shadow p-4 rounded-lg">
						<h3 className="font-semibold text-lg">Statistique 2</h3>
						<p className="text-gray-600 text-sm">Quelques infos...</p>
					</div>
					<div className="bg-white shadow p-4 rounded-lg">
						<h3 className="font-semibold text-lg">Statistique 3</h3>
						<p className="text-gray-600 text-sm">Quelques infos...</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
