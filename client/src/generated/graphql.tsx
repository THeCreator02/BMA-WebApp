import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
	/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSON: any;
};
//Weight of Product (Not given in ML must convert)
const DrumWeight = 420;
const ToteWeight = 2100;
const JugInBoxWeight = 35;
//Rate of lb per ml
const poundsPerMililiter = 0.00202;
/** Bottle Sizes of product sold at BMA USA inc. */
export enum BottleSizes {
	Gallon = 3785.41,
	TwoLiter = 2000,
	OneLiter = 1000,
	HalfLiter = 500,
	TwoThirdLiter = 750,
	Jug = 2850,
	QuarterLiter = 250,
	Tote = ToteWeight * poundsPerMililiter,
	Drum = DrumWeight * poundsPerMililiter,
	JugInBox = JugInBoxWeight * poundsPerMililiter
}

/** Box Sizes for Oils sold at BMA USA inc. */
export enum BoxSizes {
	HalfDozenTwoLiter = "6x2 Liter",
	DozenLiter = "12x1 Liter",
	HalfDozenHalfLiter = "6x500 Mililiter",
	DozenHalfLiter = "12x500 Mililiter",
	HalfDozenGallons = "6x1 Gallon",
	Jug = "4x2.85 Liter",
	DozenThirdLiter = "12x750 Mililiter",
	DozenQuarterLiter = "12x250 Mililiter"
}

export type Customer = {
	__typename?: "Customer";
	id: Scalars["Int"];
	name: Scalars["String"];
	address: Scalars["String"];
	email: Scalars["String"];
	phoneNumber: Scalars["String"];
	city: Scalars["String"];
	zipcode: Scalars["String"];
	orderIds: Array<Scalars["Int"]>;
	orders: Array<Order>;
	createdOn: Scalars["String"];
	updatedOn: Scalars["String"];
};

export type FieldError = {
	__typename?: "FieldError";
	field: Scalars["String"];
	message: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	forgotPassword: Scalars["Boolean"];
	register: UserResponse;
	login: UserResponse;
	logout: Scalars["Boolean"];
	changePassword: UserResponse;
	createPost: Post;
	updatePost?: Maybe<Post>;
	deletePost: Scalars["Boolean"];
	createOrder: Order;
	deleteOrder: Scalars["Boolean"];
	insertOrder: Customer;
	createProduct: Array<Production>;
};

export type MutationForgotPasswordArgs = {
	email: Scalars["String"];
};

export type MutationRegisterArgs = {
	options: UserAndPassword;
};

export type MutationLoginArgs = {
	password: Scalars["String"];
	usernameOrEmail: Scalars["String"];
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars["String"];
	token: Scalars["String"];
};

export type MutationCreatePostArgs = {
	input: PostInput;
};

export type MutationUpdatePostArgs = {
	title?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
};

export type MutationDeletePostArgs = {
	id: Scalars["Int"];
};

export type MutationCreateOrderArgs = {
	orderInput: OrderInput;
};

export type MutationDeleteOrderArgs = {
	id: Scalars["Int"];
};

export type MutationInsertOrderArgs = {
	customerId: Scalars["Int"];
	orderId: Scalars["Int"];
};

export type MutationCreateProductArgs = {
	productInput: ProductInput;
};

export type Order = {
	__typename?: "Order";
	id: Scalars["Int"];
	orderNumber: Scalars["String"];
	total: Scalars["Int"];
	status: Status;
	customerId: Scalars["Int"];
	customer: Customer;
	userId: Scalars["Int"];
	user: User;
	productIds?: Maybe<Array<Scalars["Int"]>>;
	products: Array<Production>;
	createdOn: Scalars["DateTime"];
	updatedOn: Scalars["DateTime"];
};

export type OrderInput = {
	customerId: Scalars["Int"];
	userId: Scalars["Int"];
	productIds: Array<Scalars["Int"]>;
};

export type Post = {
	__typename?: "Post";
	id: Scalars["Int"];
	title: Scalars["String"];
	text: Scalars["String"];
	points: Scalars["Float"];
	userId: Scalars["Int"];
	createdOn: Scalars["String"];
	updatedOn: Scalars["String"];
	textSnippet: Scalars["String"];
};

export type PostInput = {
	title: Scalars["String"];
	text: Scalars["String"];
};

export type Product = {
	__typename?: "Product";
	id: Scalars["Int"];
	brand: Scalars["String"];
	name: Scalars["String"];
	barcode: Scalars["String"];
	itemCode: Scalars["String"];
	bottleSize: BottleSizes;
	boxSize: BoxSizes;
	caseSize: Scalars["Float"];
	formula: Scalars["JSON"];
	isFusion: Scalars["Boolean"];
	isBlend: Scalars["Boolean"];
	createdOn: Scalars["String"];
	updatedOn: Scalars["String"];
};

export type ProductInput = {
	quantity: Array<Scalars["Int"]>;
	productId: Array<Scalars["Int"]>;
};

export type Production = {
	__typename?: "Production";
	id: Scalars["Int"];
	productId: Scalars["Int"];
	product: Product;
	quantity: Scalars["Int"];
	shipDate: Scalars["DateTime"];
	completed: Scalars["Int"];
	createdOn: Scalars["DateTime"];
	updatedOn: Scalars["DateTime"];
};

export type Query = {
	__typename?: "Query";
	products?: Maybe<Array<Product>>;
	allProducts?: Maybe<Array<Product>>;
	getProducts?: Maybe<Array<Product>>;
	hello: Scalars["String"];
	me?: Maybe<User>;
	getUser: User;
	posts: Array<Post>;
	post?: Maybe<Post>;
	orders: Array<Order>;
	getOrder: Order;
	customers?: Maybe<Array<Customer>>;
	getCustomer: Customer;
	getProductsInProgress: Array<Production>;
};

export type QueryProductsArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryGetProductsArgs = {
	productIds: Array<Scalars["Int"]>;
};

export type QueryGetUserArgs = {
	id: Scalars["Int"];
};

export type QueryPostsArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryPostArgs = {
	id: Scalars["Int"];
};

export type QueryOrdersArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryGetOrderArgs = {
	id: Scalars["Int"];
};

export type QueryCustomersArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryGetCustomerArgs = {
	id: Scalars["Int"];
};

/** Status updates for orders */
export enum Status {
	Pending = "PENDING",
	Recieved = "RECIEVED",
	Production = "PRODUCTION",
	Shipped = "SHIPPED",
	Completed = "COMPLETED"
}

export type User = {
	__typename?: "User";
	id: Scalars["Int"];
	username: Scalars["String"];
	email: Scalars["String"];
	createdOn: Scalars["String"];
	updatedOn: Scalars["String"];
};

export type UserAndPassword = {
	email: Scalars["String"];
	username: Scalars["String"];
	password: Scalars["String"];
};

export type UserResponse = {
	__typename?: "UserResponse";
	errors?: Maybe<Array<FieldError>>;
	user?: Maybe<User>;
};

export type ConsumerFragment = { __typename?: "Customer" } & Pick<
	Customer,
	"id" | "name" | "address" | "city" | "zipcode" | "phoneNumber" | "email"
> & { orders: Array<{ __typename?: "Order" } & OrdrFragment> };

export type ErrFragment = { __typename?: "FieldError" } & Pick<
	FieldError,
	"field" | "message"
>;

export type OrdrFragment = { __typename?: "Order" } & Pick<
	Order,
	"id" | "orderNumber" | "status" | "productIds" | "createdOn" | "updatedOn"
> & {
		user: { __typename?: "User" } & Pick<User, "id" | "username" | "email">;
		customer: { __typename?: "Customer" } & Pick<
			Customer,
			| "id"
			| "name"
			| "city"
			| "phoneNumber"
			| "zipcode"
			| "address"
			| "email"
		>;
		products: Array<
			{ __typename?: "Production" } & Pick<
				Production,
				"quantity" | "completed"
			> & {
					product: { __typename?: "Product" } & Pick<
						Product,
						| "id"
						| "name"
						| "boxSize"
						| "bottleSize"
						| "caseSize"
						| "formula"
					>;
				}
		>;
	};

export type PostDataFragment = { __typename?: "Post" } & Pick<
	Post,
	"id" | "title" | "textSnippet" | "points" | "createdOn" | "updatedOn"
>;

export type ProduceFragment = { __typename?: "Product" } & Pick<
	Product,
	| "id"
	| "brand"
	| "name"
	| "bottleSize"
	| "boxSize"
	| "caseSize"
	| "itemCode"
	| "barcode"
>;

export type UsrFragment = { __typename?: "User" } & Pick<
	User,
	"id" | "username" | "email"
>;

export type UsrResFragment = { __typename?: "UserResponse" } & {
	errors?: Maybe<Array<{ __typename?: "FieldError" } & ErrFragment>>;
	user?: Maybe<{ __typename?: "User" } & UsrFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
	token: Scalars["String"];
	newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
	changePassword: { __typename?: "UserResponse" } & UsrResFragment;
};

export type CreateOrderMutationVariables = Exact<{
	orderInput: OrderInput;
}>;

export type CreateOrderMutation = { __typename?: "Mutation" } & {
	createOrder: { __typename?: "Order" } & OrdrFragment;
};

export type CreatePostMutationVariables = Exact<{
	input: PostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
	createPost: { __typename?: "Post" } & PostDataFragment;
};

export type CreateProductMutationVariables = Exact<{
	productIds: Array<Scalars["Int"]> | Scalars["Int"];
	quantity: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type CreateProductMutation = { __typename?: "Mutation" } & {
	createProduct: Array<
		{ __typename?: "Production" } & Pick<Production, "id">
	>;
};

export type ForgotPasswordMutationVariables = Exact<{
	email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
	Mutation,
	"forgotPassword"
>;

export type LoginMutationVariables = Exact<{
	usernameOrEmail: Scalars["String"];
	password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
	login: { __typename?: "UserResponse" } & UsrResFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
	Mutation,
	"logout"
>;

export type RegisterMutationVariables = Exact<{
	options: UserAndPassword;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
	register: { __typename?: "UserResponse" } & UsrResFragment;
};

export type GetProductsQueryVariables = Exact<{
	productIds: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type GetProductsQuery = { __typename?: "Query" } & {
	getProducts?: Maybe<Array<{ __typename?: "Product" } & ProduceFragment>>;
};

export type GetUserQueryVariables = Exact<{
	id: Scalars["Int"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
	getUser: { __typename?: "User" } & UsrFragment;
};

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type AllProductsQuery = { __typename?: "Query" } & {
	allProducts?: Maybe<
		Array<
			{ __typename?: "Product" } & Pick<
				Product,
				"id" | "brand" | "name" | "boxSize" | "bottleSize"
			>
		>
	>;
};

export type CustomersQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type CustomersQuery = { __typename?: "Query" } & {
	customers?: Maybe<Array<{ __typename?: "Customer" } & ConsumerFragment>>;
};

export type GetCustomerQueryVariables = Exact<{
	id: Scalars["Int"];
}>;

export type GetCustomerQuery = { __typename?: "Query" } & {
	getCustomer: { __typename?: "Customer" } & ConsumerFragment;
};

export type GetOrderQueryVariables = Exact<{
	id: Scalars["Int"];
}>;

export type GetOrderQuery = { __typename?: "Query" } & {
	getOrder: { __typename?: "Order" } & OrdrFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
	me?: Maybe<{ __typename?: "User" } & UsrFragment>;
};

export type OrdersQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type OrdersQuery = { __typename?: "Query" } & {
	orders: Array<{ __typename?: "Order" } & OrdrFragment>;
};

export type PostsQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type PostsQuery = { __typename?: "Query" } & {
	posts: Array<{ __typename?: "Post" } & PostDataFragment>;
};

export const OrdrFragmentDoc = gql`
	fragment ordr on Order {
		id
		orderNumber
		status
		user {
			id
			username
			email
		}
		customer {
			id
			name
			city
			phoneNumber
			zipcode
			address
			email
		}
		productIds
		products {
			quantity
			completed
			product {
				id
				name
				boxSize
				bottleSize
				caseSize
				formula
			}
		}
		createdOn
		updatedOn
	}
`;
export const ConsumerFragmentDoc = gql`
	fragment consumer on Customer {
		id
		name
		address
		city
		zipcode
		phoneNumber
		email
		orders {
			...ordr
		}
	}
	${OrdrFragmentDoc}
`;
export const PostDataFragmentDoc = gql`
	fragment postData on Post {
		id
		title
		textSnippet
		points
		createdOn
		updatedOn
	}
`;
export const ProduceFragmentDoc = gql`
	fragment produce on Product {
		id
		brand
		name
		bottleSize
		boxSize
		caseSize
		itemCode
		barcode
	}
`;
export const ErrFragmentDoc = gql`
	fragment err on FieldError {
		field
		message
	}
`;
export const UsrFragmentDoc = gql`
	fragment usr on User {
		id
		username
		email
	}
`;
export const UsrResFragmentDoc = gql`
	fragment usrRes on UserResponse {
		errors {
			...err
		}
		user {
			...usr
		}
	}
	${ErrFragmentDoc}
	${UsrFragmentDoc}
`;
export const ChangePasswordDocument = gql`
	mutation ChangePassword($token: String!, $newPassword: String!) {
		changePassword(token: $token, newPassword: $newPassword) {
			...usrRes
		}
	}
	${UsrResFragmentDoc}
`;

export function useChangePasswordMutation() {
	return Urql.useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(ChangePasswordDocument);
}
export const CreateOrderDocument = gql`
	mutation CreateOrder($orderInput: OrderInput!) {
		createOrder(orderInput: $orderInput) {
			...ordr
		}
	}
	${OrdrFragmentDoc}
`;

export function useCreateOrderMutation() {
	return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
		CreateOrderDocument
	);
}
export const CreatePostDocument = gql`
	mutation CreatePost($input: PostInput!) {
		createPost(input: $input) {
			...postData
		}
	}
	${PostDataFragmentDoc}
`;

export function useCreatePostMutation() {
	return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
		CreatePostDocument
	);
}
export const CreateProductDocument = gql`
	mutation CreateProduct($productIds: [Int!]!, $quantity: [Int!]!) {
		createProduct(
			productInput: { quantity: $quantity, productId: $productIds }
		) {
			id
		}
	}
`;

export function useCreateProductMutation() {
	return Urql.useMutation<
		CreateProductMutation,
		CreateProductMutationVariables
	>(CreateProductDocument);
}
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export function useForgotPasswordMutation() {
	return Urql.useMutation<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>(ForgotPasswordDocument);
}
export const LoginDocument = gql`
	mutation Login($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			...usrRes
		}
	}
	${UsrResFragmentDoc}
`;

export function useLoginMutation() {
	return Urql.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument
	);
}
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`;

export function useLogoutMutation() {
	return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument
	);
}
export const RegisterDocument = gql`
	mutation Register($options: UserAndPassword!) {
		register(options: $options) {
			...usrRes
		}
	}
	${UsrResFragmentDoc}
`;

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	);
}
export const GetProductsDocument = gql`
	query GetProducts($productIds: [Int!]!) {
		getProducts(productIds: $productIds) {
			...produce
		}
	}
	${ProduceFragmentDoc}
`;

export function useGetProductsQuery(
	options: Omit<Urql.UseQueryArgs<GetProductsQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<GetProductsQuery>({
		query: GetProductsDocument,
		...options
	});
}
export const GetUserDocument = gql`
	query GetUser($id: Int!) {
		getUser(id: $id) {
			...usr
		}
	}
	${UsrFragmentDoc}
`;

export function useGetUserQuery(
	options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
}
export const AllProductsDocument = gql`
	query AllProducts {
		allProducts {
			id
			brand
			name
			boxSize
			bottleSize
		}
	}
`;

export function useAllProductsQuery(
	options: Omit<Urql.UseQueryArgs<AllProductsQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<AllProductsQuery>({
		query: AllProductsDocument,
		...options
	});
}
export const CustomersDocument = gql`
	query Customers($limit: Int!, $cursor: String) {
		customers(limit: $limit, cursor: $cursor) {
			...consumer
		}
	}
	${ConsumerFragmentDoc}
`;

export function useCustomersQuery(
	options: Omit<Urql.UseQueryArgs<CustomersQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<CustomersQuery>({
		query: CustomersDocument,
		...options
	});
}
export const GetCustomerDocument = gql`
	query GetCustomer($id: Int!) {
		getCustomer(id: $id) {
			...consumer
		}
	}
	${ConsumerFragmentDoc}
`;

export function useGetCustomerQuery(
	options: Omit<Urql.UseQueryArgs<GetCustomerQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<GetCustomerQuery>({
		query: GetCustomerDocument,
		...options
	});
}
export const GetOrderDocument = gql`
	query GetOrder($id: Int!) {
		getOrder(id: $id) {
			...ordr
		}
	}
	${OrdrFragmentDoc}
`;

export function useGetOrderQuery(
	options: Omit<Urql.UseQueryArgs<GetOrderQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<GetOrderQuery>({
		query: GetOrderDocument,
		...options
	});
}
export const MeDocument = gql`
	query Me {
		me {
			...usr
		}
	}
	${UsrFragmentDoc}
`;

export function useMeQuery(
	options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const OrdersDocument = gql`
	query Orders($limit: Int!, $cursor: String) {
		orders(limit: $limit, cursor: $cursor) {
			...ordr
		}
	}
	${OrdrFragmentDoc}
`;

export function useOrdersQuery(
	options: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options });
}
export const PostsDocument = gql`
	query Posts($limit: Int!, $cursor: String) {
		posts(limit: $limit, cursor: $cursor) {
			...postData
		}
	}
	${PostDataFragmentDoc}
`;

export function usePostsQuery(
	options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
