//defeinicion que una clase adaptadora tenga que implementar

export interface HttpAdapter {
    get<T>(url: String ):Promise<T>;
}