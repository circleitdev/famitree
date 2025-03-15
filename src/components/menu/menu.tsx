import { CloudDownloadIcon, ExpandIcon, FileIcon, FullscreenIcon, GithubIcon, HardDriveUpload, HelpCircleIcon, MenuIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { MenuFamilyNode } from '@/types/globals';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { Button } from '@/components/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';

export default function Menu({ nodes, toggleNodesView, chart, loadLocalStorage, family }: MenuFamilyNode) {
	const [saveModal, openSaveModal] = useState(false);
	const [openHelp, openHelpModal] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={'icon'} className='shadow'>
						<MenuIcon size={16} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{/* FILE */}
					<DropdownMenuLabel>Berkas</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => (location.href = '/')}>
						<FileIcon size={16} className='mr-2' /> Silsilah baru
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => openSaveModal(true)} disabled={family.id !== ''}>
						<SaveIcon size={16} className='mr-2' /> {family.id ? 'Tersimpan otomatis' : 'Simpan silsilah'}{' '}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={loadLocalStorage} disabled={nodes.length === 0}>
						<HardDriveUpload size={16} className='mr-2' /> Lihat versi lokal{' '}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => chart.exportImg({ backgroundColor: '#f5f5f5' })} disabled={nodes.length === 0}>
						<CloudDownloadIcon size={16} className='mr-2' /> Simpan gambar (PNG)
					</DropdownMenuItem>

					{/* CONTROL */}
					<DropdownMenuSeparator />
					<DropdownMenuLabel>Kontrol</DropdownMenuLabel>
					<DropdownMenuItem onClick={toggleNodesView} disabled={nodes.length === 0}>
						<ExpandIcon size={16} className='mr-2' /> Buka / tutup semua
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => chart.fit()} disabled={nodes.length === 0}>
						<FullscreenIcon size={16} className='mr-2' /> Sesuikan dengan layar
					</DropdownMenuItem>

					{/* OTHERS */}
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => openHelpModal(true)}>
						<HelpCircleIcon size={16} className='mr-2' /> Bantuan
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => window.open('https://github.com/famasya/silsilah', '_blank')}>
						<GithubIcon size={16} className='mr-2' /> Kode sumber
					</DropdownMenuItem>
					<DropdownMenuItem className='flex flex-col items-start gap-2 text-xs'>
						<span>
							ID : <strong>{family.id ? family.id.split('-')[0] : '-'}</strong>
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={saveModal} onOpenChange={openSaveModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Nama keluarga</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<Input id='name' required name='name' placeholder='Misal: Bani Djojoredjo' />
						<Button type='submit' className='mt-2 w-full font-semibold shadow'>
							Simpan
						</Button>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={openHelp} onOpenChange={openHelpModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Bantuan</DialogTitle>
					</DialogHeader>
					<div>
						<p>1. Kami tidak menyimpan data pribadi Anda.</p>
						<p>
							2. Gunakan menu <strong>Lihat dari Lokal</strong> untuk membandingkan dengan versi lokal peramban ini (misal: jika sinkronisasi <em>cloud</em> gagal).
						</p>
						<p className='mt-4 text-xs'>Dibuat pada hari Selasa, 29 Ramadhan 1445 H.</p>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
