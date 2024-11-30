export function price(value) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function cpf(doc) {
  return doc.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function phone(n) {
  return n.replace(/(\d{2})(\d+)((\d{4}))/, "($1) $2-$3")
}
