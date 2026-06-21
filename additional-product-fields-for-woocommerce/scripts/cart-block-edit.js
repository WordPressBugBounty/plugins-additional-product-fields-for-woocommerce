/**
 * Soporte del enlace "Edit Options" para el Bloque de Carrito / Mini-cart de WooCommerce.
 *
 * El bloque de carrito se renderiza con la Store API y NO usa el filtro PHP
 * `woocommerce_cart_item_name`, ademas de pasar el item_data por `wp_strip_all_tags`,
 * por lo que el enlace que el plugin inyecta en el carrito clasico no aparece aqui.
 *
 * En su lugar usamos el filtro JS `itemName` (que el bloque renderiza con
 * dangerouslySetInnerHTML, es decir como HTML). La URL de edicion llega por item
 * dentro de `cartItem.extensions['woo-extra-products']`, expuesta desde PHP via
 * `woocommerce_store_api_register_endpoint_data`.
 */
( function () {
	var wc = window.wc;
	if ( ! wc || ! wc.blocksCheckout || typeof wc.blocksCheckout.registerCheckoutFilters !== 'function' ) {
		return;
	}

	var NAMESPACE = 'woo-extra-products';

	function getEditData( cartItem ) {
		if ( ! cartItem || ! cartItem.extensions ) {
			return null;
		}
		var ext = cartItem.extensions[ NAMESPACE ];
		if ( ! ext || ! ext.edit_url ) {
			return null;
		}
		return ext;
	}

	function escapeHtml( value ) {
		return String( value )
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' );
	}

	wc.blocksCheckout.registerCheckoutFilters( NAMESPACE, {
		itemName: function ( defaultValue, extensions, args ) {
			// Solo en el carrito; en el resumen del checkout no se editan opciones
			// (coherente con el filtro PHP, condicionado a !is_checkout()).
			if ( ! args || args.context !== 'cart' ) {
				return defaultValue;
			}
			var cartItem = args.cartItem;
			var data = getEditData( cartItem );
			if ( ! data ) {
				return defaultValue;
			}

			var url = escapeHtml( data.edit_url );
			var label = escapeHtml( data.edit_label ? data.edit_label : 'Edit Options' );

			// El nombre se pinta con dangerouslySetInnerHTML DENTRO del <a> del producto.
			// Usamos un <span> (no un <a>) para no anidar enlaces; el click lo gestiona
			// el listener en fase de captura de mas abajo.
			return defaultValue +
				'<span class="rn-edit-options rn-edit-options-block" role="link" tabindex="0"' +
				' data-rn-edit-url="' + url + '"' +
				' style="font-size:12px;display:block;cursor:pointer;text-decoration:underline;">' +
				label +
				'</span>';
		},
	} );

	function navigate( el ) {
		var url = el.getAttribute( 'data-rn-edit-url' );
		if ( url ) {
			window.location.href = url;
		}
	}

	function findTarget( e ) {
		return e.target && e.target.closest ? e.target.closest( '.rn-edit-options-block' ) : null;
	}

	// El <span> vive dentro del <a> del producto: interceptamos en captura para evitar
	// que el click navegue a la pagina del producto y redirigimos al editor.
	document.addEventListener( 'click', function ( e ) {
		var el = findTarget( e );
		if ( ! el ) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		navigate( el );
	}, true );

	document.addEventListener( 'keydown', function ( e ) {
		if ( e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar' ) {
			return;
		}
		var el = findTarget( e );
		if ( ! el ) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		navigate( el );
	}, true );
} )();
