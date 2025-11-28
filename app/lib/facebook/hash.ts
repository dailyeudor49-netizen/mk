/**
 * Utility per hashare i dati utente con SHA256
 * Usa Web Crypto API (crypto.subtle.digest)
 */

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Hash del nome - lowercase, trim, poi SHA256
 */
export async function hashNome(nome: string | undefined): Promise<string> {
  if (!nome) return '';
  const normalized = nome.toLowerCase().trim();
  console.log('[FB Hash] Nome originale:', nome, '-> normalizzato:', normalized);
  const hashed = await sha256(normalized);
  console.log('[FB Hash] Nome hashato:', hashed.substring(0, 20) + '...');
  return hashed;
}

/**
 * Hash del cognome - lowercase, trim, poi SHA256
 */
export async function hashCognome(cognome: string | undefined): Promise<string> {
  if (!cognome) return '';
  const normalized = cognome.toLowerCase().trim();
  console.log('[FB Hash] Cognome originale:', cognome, '-> normalizzato:', normalized);
  const hashed = await sha256(normalized);
  console.log('[FB Hash] Cognome hashato:', hashed.substring(0, 20) + '...');
  return hashed;
}

/**
 * Hash del telefono - rimuovi caratteri non numerici, aggiungi prefisso 39 se manca
 * e il numero è italiano (10 cifre che inizia con 3), poi SHA256
 */
export async function hashTelefono(telefono: string | undefined): Promise<string> {
  if (!telefono) return '';

  // Rimuovi tutti i caratteri non numerici
  let normalized = telefono.replace(/\D/g, '');

  // Se il numero ha 10 cifre e inizia con 3, aggiungi prefisso italiano 39
  if (normalized.length === 10 && normalized.startsWith('3')) {
    normalized = '39' + normalized;
  }

  console.log('[FB Hash] Telefono originale:', telefono, '-> normalizzato:', normalized);
  const hashed = await sha256(normalized);
  console.log('[FB Hash] Telefono hashato:', hashed.substring(0, 20) + '...');
  return hashed;
}

/**
 * Hash dell'email - lowercase, trim, poi SHA256
 */
export async function hashEmail(email: string | undefined): Promise<string> {
  if (!email) return '';
  const normalized = email.toLowerCase().trim();
  console.log('[FB Hash] Email originale:', email, '-> normalizzato:', normalized);
  const hashed = await sha256(normalized);
  console.log('[FB Hash] Email hashato:', hashed.substring(0, 20) + '...');
  return hashed;
}
