export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
    <div className="container mx-auto flex flex-col items-center">
        <p className="mb-2">© 2024 Mon Entreprise. Tous droits réservés.</p>
        <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Accueil</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Produits</a>
            <a href="#" className="hover:text-white">Contact</a>
        </div>
    </div>
</footer>

    )
}
