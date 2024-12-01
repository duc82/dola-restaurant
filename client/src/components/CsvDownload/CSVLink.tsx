interface CSVLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  data: any[];
  filename: string;
}

const convertToCSV = (data: any[]) => {
  let csv = "";

  // Add header row
  const headers = Object.keys(data[0]);
  csv += headers.join(",") + "\n";

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => row[header]);
    csv += values.join(",") + "\n";
  }

  return csv;
};

export default function CSVLink({
  data,
  filename,
  children,
  ...rest
}: CSVLinkProps) {
  const buildURI = (data: any[]) => {
    const csv = convertToCSV(data);

    // Encode CSV in UTF-8
    const encoder = new TextEncoder();
    const utf8csv = encoder.encode(csv);

    // Add BOM to the beginning of the file
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const utf8csvWithBom = new Uint8Array(bom.length + utf8csv.length);
    utf8csvWithBom.set(bom);
    utf8csvWithBom.set(utf8csv, bom.length);

    const blob = new Blob([utf8csvWithBom], {
      type: "text/csv;charset=utf-8;",
    });
    return URL.createObjectURL(blob);
  };

  const href = buildURI(data);

  return (
    <a {...rest} download={filename} href={href}>
      {children}
    </a>
  );
}
