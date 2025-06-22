
import { Country, countriesData } from '@/data/countries';

export class CountryService {
  private static countries: Country[] = [...countriesData];

  // Récupérer tous les pays
  static getAllCountries(): Country[] {
    return [...this.countries];
  }

  // Récupérer un pays par ID
  static getCountryById(id: string): Country | undefined {
    return this.countries.find(country => country.id === id);
  }

  // Récupérer un pays par code
  static getCountryByCode(code: string): Country | undefined {
    return this.countries.find(country => country.code === code);
  }

  // Ajouter un nouveau pays
  static addCountry(countryData: Omit<Country, 'id'>): Country {
    const newCountry: Country = {
      id: (this.countries.length + 1).toString(),
      ...countryData
    };
    this.countries.push(newCountry);
    return newCountry;
  }

  // Mettre à jour un pays
  static updateCountry(id: string, updates: Partial<Omit<Country, 'id'>>): Country | null {
    const index = this.countries.findIndex(country => country.id === id);
    if (index === -1) return null;

    this.countries[index] = { ...this.countries[index], ...updates };
    return this.countries[index];
  }

  // Supprimer un pays
  static deleteCountry(id: string): boolean {
    const index = this.countries.findIndex(country => country.id === id);
    if (index === -1) return false;

    this.countries.splice(index, 1);
    return true;
  }

  // Rechercher des pays par nom
  static searchCountries(query: string): Country[] {
    const lowerQuery = query.toLowerCase();
    return this.countries.filter(country =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery)
    );
  }

  // Récupérer les villes d'un pays
  static getCitiesByCountryCode(code: string): string[] {
    const country = this.getCountryByCode(code);
    return country?.cities || [];
  }
}
