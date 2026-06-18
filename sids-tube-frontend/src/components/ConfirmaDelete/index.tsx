import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import * as styles from './styles';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    videoTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    videoTitle,
    onConfirm,
    onCancel,
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <AlertTriangle size={24} className={styles.warningIcon} />
                    </div>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className={styles.closeButton}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>Excluir video</h2>
                    <div className={styles.warningBox}>
                        <p className={styles.warningText}>
                            Esta ação é <strong>irreversível</strong>!
                            Deseja excluir permanentemente o vídeo?
                        </p>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className={styles.cancelButton}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={styles.confirmButton}
                    >
                        {isLoading ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
