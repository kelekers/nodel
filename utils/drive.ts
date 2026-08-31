// #VARIABLES
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// #STATE
let tokenClient: any;
let accessToken: string | null = null;

// #FUNCTIONS
export const initGoogleAuth = (onSuccess: () => void) => {
  if (typeof window !== 'undefined' && window.google) {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response: any) => {
        if (response.error !== undefined) {
          throw response;
        }
        accessToken = response.access_token;
        onSuccess();
      },
    });
  }
};

export const loginToDrive = () => {
  if (tokenClient) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  }
};

export const saveToDrive = async (fileName: string, data: any) => {
  if (!accessToken) return;

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
  };

  const fileContent = JSON.stringify(data);
  const file = new Blob([fileContent], { type: 'application/json' });
  
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  });

  return res.json();
};