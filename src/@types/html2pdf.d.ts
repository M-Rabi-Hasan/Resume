declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | string;
        filename?: string;
        image?: {
            type?: string;
            quality?: number;
        };
        html2canvas?: {
            scale?: number;
        };
        jsPDF?: {
            unit?: string;
            format?: string | string[];
            orientation?: string;
        };
    }

    export default function html2pdf(element: HTMLElement): {
        set(options: Html2PdfOptions): this;
        save(filename?: string): Promise<void>;
    };
}
