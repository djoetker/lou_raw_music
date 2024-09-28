import { Dropbox } from "dropbox";
import { files } from 'dropbox';


type FileMetadata = files.FileMetadataReference;
const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN });

export async function getWavFiles() {
  console.log(process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN);

  try {
    // dbx.usersGetCurrentAccount()
    //   .then(function (response) {
    //     console.log("user:", response);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    const response = await dbx.filesListFolder({ path: '/TEST' });
    const files = response.result.entries
      .filter((entry): entry is FileMetadata => entry['.tag'] === 'file' && entry.name.endsWith('.mp3'))
      .map(file => ({
        id: file.id,
        name: file.name,
        path_lower: file.path_lower!,
      }));
    files.map((entry) => {
      const nameWithoutMp3 = entry.name.slice(0, -4);
      entry.name = nameWithoutMp3;
    })
    console.log("files:", files);
    return files;
  } catch (error) {
    console.error('Error getting files', error);
    return [{ id: '', name: '', path_lower: '' }];
  };
};

export async function downloadWavFile(path: string) {
  try {
    console.log("path:", path);
    const response = await dbx.filesDownload({ path });
    console.log("download:", response);
    return URL.createObjectURL(response.result.fileBlob);
  } catch (error) {
    console.error('Error downloading file', error);
    return '';
  };
};