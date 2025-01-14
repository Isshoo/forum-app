import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import NotesList from '../components/Home-Page/ThreadsList';
import SearchNotesForm from '../components/Home-Page/SearchNotesForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import useSearch from '../hooks/useSearch';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, onKeywordChangeHandler] = useSearch();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      getActiveNotes().then(({ data }) => {
        setNotes(data);
        setLoading(false);
      });
      firstRun.current = false;
    }
  }, []);

  async function onDeleteHandler(id) {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Catatan ini akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      });

      if (!result.isConfirmed) {
        return;
      }

      await deleteNote(id);

      const { data } = await getActiveNotes();
      setNotes(data);

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Catatan telah dihapus.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error saat menghapus catatan:', error);

      await Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menghapus catatan. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  async function onArchivingHandler(id) {
    await archiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="pages-section">
      <SearchNotesForm keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <br />
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchivingHandler}
        loading={loading}
      />
      <AddPageLink />
    </section>
  );
}

export default HomePage;
